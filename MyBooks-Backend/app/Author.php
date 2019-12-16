<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $table = 'author';
    public $timestamps = true;

    protected $fillable = [
        'name'
    ];

    public function Book()
    {
        return $this->hasMany('App\Book');
    }
}
