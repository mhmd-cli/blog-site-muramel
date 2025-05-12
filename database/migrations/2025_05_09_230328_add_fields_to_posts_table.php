<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            if (!Schema::hasColumn('posts', 'is_featured')) {
                $table->boolean('is_featured')->default(false);
            }

            if (!Schema::hasColumn('posts', 'views')) {
                $table->integer('views')->default(0);
            }

            if (Schema::hasColumn('posts', 'image')) {
                $table->string('image')->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            if (Schema::hasColumn('posts', 'is_featured')) {
                $table->dropColumn('is_featured');
            }

            if (Schema::hasColumn('posts', 'views')) {
                $table->dropColumn('views');
            }

            if (Schema::hasColumn('posts', 'image')) {
                $table->string('image')->nullable(false)->change(); // assuming original was NOT NULL
            }
        });
    }
};
