<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Book extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 160)->nullable(false);
            $table->text('description')->nullable(true);
            $table->string('ISBN', 20)->nullable(false);
            $table->integer('author_id')->index('fk_book_author_idx');
            $table->integer('publishing_company_id')->index('fk_book_publishing_company_idx');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('book');
    }
}
