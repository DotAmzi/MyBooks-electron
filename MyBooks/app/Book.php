<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'book';
    public $timestamps = true;

    protected $fillable = [
        'name',
        'description',
        'ISBN',
        'author_id',
        'publishing_company_id'
    ];

    public function Author()
    {
      return $this->belongsTo('App\Author');
    }
}
