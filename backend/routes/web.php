<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SignupController;
use App\Http\Controllers\Api\V1\SigninController;
use App\Http\Controllers\Api\V1\SignoutController;
use App\Http\Controllers\Api\V1\AuthController;


Route::get('/', function () {
    return view('welcome');
});
