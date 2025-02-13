<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\ReviewController;
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

Route::get('/cart/get_carts', [CartController::class, 'getCarts']);

Route::resources([
  '/cart' => CartController::class,
]);

Route::delete('/favorite/delete', [FavoriteController::class, 'delete']);

Route::resources([
  '/favorite' => FavoriteController::class,
]);

Route::resources([
  '/user' => UserController::class,
]);

Route::get('/review/get_list', [ReviewController::class, 'getList']);
Route::get('/review/get_reviews_with_user_names', [ReviewController::class, 'getReviewsWithUserNames']);

Route::resources([
  '/review' => ReviewController::class,
]);

Route::middleware(['auth:sanctum', 'auth_check:user'])->group(function () {});

Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/login', [AuthController::class, 'login']);
