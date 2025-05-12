<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'body', 
        'slug', 
        'image', 
        'category_id', 
        'excerpt', 
        'published_at',
        'is_featured',
        'views'
    ];

    protected $appends = ['image_url', 'read_time'];
    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function category()
    {
        return $this->belongsTo(Category::class)->withDefault([
            'name' => 'Uncategorized',
            'slug' => 'uncategorized'
        ]);
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        if (config('filesystems.default') === 's3') {
            return Storage::url($this->image);
        }

        $path = str_replace('public/', '', $this->image);
        return Storage::disk('public')->exists($path) 
            ? Storage::url($path)
            : null;
    }

    public function getReadTimeAttribute()
    {
        if (empty($this->body)) {
            return 0;
        }
        
        $wordCount = str_word_count(strip_tags($this->body));
        return max(1, ceil($wordCount / 200)); // At least 1 minute
    }

    public function isPublished(): bool
    {
        return $this->published_at !== null && $this->published_at <= now();
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePopular($query, $days = 30)
    {
        return $query->where('published_at', '>=', now()->subDays($days))
                    ->orderBy('views', 'desc');
    }

    public function getPreviousPost()
    {
        if (is_null($this->published_at)) {
            return null;
        }

        return static::published()
            ->where('id', '!=', $this->id)
            ->where('published_at', '<', $this->published_at)
            ->latest('published_at')
            ->first(['title', 'slug']);
    }

    public function getNextPost()
    {
        if (is_null($this->published_at)) {
            return null;
        }

        return static::published()
            ->where('id', '!=', $this->id)
            ->where('published_at', '>', $this->published_at)
            ->oldest('published_at')
            ->first(['title', 'slug']);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $post->slug = $post->createUniqueSlug();
            
            if (!$post->excerpt) {
                $post->excerpt = Str::limit(strip_tags($post->body), 150);
            }

            if (!$post->published_at && app()->environment('production')) {
                $post->published_at = now();
            }
        });

        static::updating(function ($post) {
            if ($post->isDirty('title')) {
                $post->slug = $post->createUniqueSlug();
            }
        });
    }

    protected function createUniqueSlug()
    {
        $slug = Str::slug($this->title);
        $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")
                     ->where('id', '!=', $this->id ?? 0)
                     ->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }
}
