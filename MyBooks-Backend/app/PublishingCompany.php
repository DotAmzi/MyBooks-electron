<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublishingCompany extends Model
{
    protected $table = 'publishing_company';
    public $timestamps = true;

    protected $fillable = [
        'name'
    ];

    public function Book()
    {
        return $this->hasMany('App\Book');
    }
}
