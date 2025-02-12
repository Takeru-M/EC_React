<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\FavoriteController;

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

// Route::middleware('auth:sanctum')->group(function () {
//     Route::resources([
//         '/user' => UserController::class,
//     ]);
//     Route::resources([
//         '/product' => ProductController::class,
//     ]);
// });

Route::resources([
  '/product' => ProductController::class,
]);

Route::resources([
  '/cart' => CartController::class,
]);

Route::resources([
  '/favorite' => FavoriteController::class,
]);

Route::resources([
  '/user' => UserController::class,
]);

Route::middleware(['auth:sanctum', 'auth_check:user'])->group(function () {});

Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/login', [AuthController::class, 'login']);
