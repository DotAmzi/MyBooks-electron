<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'publisher'], function () {
    Route::get('/', 'PublishingCompanyController@index');
    Route::post('/', 'PublishingCompanyController@save');
    Route::get('/{id}', 'PublishingCompanyController@get');
    Route::put('/{id}', 'PublishingCompanyController@update');
    Route::delete('/{id}', 'PublishingCompanyController@destroy');
});

Route::group(['prefix' => 'author'], function () {
    Route::get('/', 'AuthorController@index');
    Route::post('/', 'AuthorController@save');
    Route::get('/{id}', 'AuthorController@get');
    Route::put('/{id}', 'AuthorController@update');
    Route::delete('/{id}', 'AuthorController@destroy');
});

Route::group(['prefix' => 'book'], function () {
    Route::get('/', 'BookController@index');
    Route::post('/', 'BookController@save');
    Route::get('/{id}', 'BookController@get');
    Route::put('/{id}', 'BookController@update');
    Route::delete('/{id}', 'BookController@destroy');
});
