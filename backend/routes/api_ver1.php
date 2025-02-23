<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\CategoryController;

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

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/signout', [AuthController::class, 'signout']);

Route::resources([
  '/category' => CategoryController::class,
]);

Route::get('/search', [ProductController::class, 'searchProducts']);
Route::resources([
  '/product' => ProductController::class,
]);

Route::get('/review/get_list', [ReviewController::class, 'getList']);
Route::get('/review/get_reviews_with_user_names', [ReviewController::class, 'getReviewsWithUserNames']);

Route::group(['middleware' => ['auth:sanctum']], function () {

  Route::get('/fetch_user', [AuthController::class, 'fetchUser']);
  Route::post('/signout', [AuthController::class, 'signout']);

  Route::put('/user/password/{user}', [UserController::class, 'updatePassword']);

  Route::resources([
    '/user' => UserController::class,
  ]);

  Route::get('/cart/fetch_carts', [CartController::class, 'fetchCarts']);

  Route::resources([
    '/cart' => CartController::class,
  ]);

  Route::get('/favorite/get_favorites', [FavoriteController::class, 'getList']);

  Route::resources([
    '/favorite' => FavoriteController::class,
  ]);

  Route::resources([
    '/review' => ReviewController::class,
  ]);
});
