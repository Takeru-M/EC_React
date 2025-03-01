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
use App\Http\Controllers\Api\V1\StripeController;
use App\Http\Controllers\Api\V1\ShippingAddressController;

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

Route::get('/review/get-list', [ReviewController::class, 'getList']);
Route::get('/review/get-reviews-with-user-names', [ReviewController::class, 'getReviewsWithUserNames']);

Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);

Route::post('/guest-user', [AuthController::class, 'createGuestUser']);
Route::get('/fetch-user', [AuthController::class, 'fetchUser']);

Route::get('/cart/guest', [CartController::class, 'fetchCartsForGuest']);
Route::post('/cart/guest', [CartController::class, 'storeForGuest']);
Route::delete('/cart', [CartController::class, 'destroy']);

Route::get('/favorite/guest', [FavoriteController::class, 'fetchFavoritesForGuest']);
Route::post('/favorite/guest', [FavoriteController::class, 'storeForGuest']);
Route::delete('/favorite', [FavoriteController::class, 'destroy']);

Route::group(['middleware' => ['auth:sanctum']], function () {

  Route::post('/signout', [AuthController::class, 'signout']);

  Route::get('/user/address', [ShippingAddressController::class, 'fetchAddresses']);
  Route::post('/user/address', [ShippingAddressController::class, 'createAddress']);
  Route::put('/user/address', [ShippingAddressController::class, 'updateAddress']);
  Route::delete('/user/address', [ShippingAddressController::class, 'deleteAddress']);
  Route::put('/user/address/default', [ShippingAddressController::class, 'switchDefaultAddress']);

  Route::put('/user/password/{user}', [UserController::class, 'updatePassword']);

  Route::resources([
    '/user' => UserController::class,
  ]);

  Route::get('/cart/fetch-carts', [CartController::class, 'fetchCarts']);
  Route::post('/cart/integrate', [CartController::class, 'integrateCart']);

  Route::resources([
    '/cart' => CartController::class,
  ]);

  Route::get('/favorite/fetch-favorites', [FavoriteController::class, 'fetchFavorites']);
  Route::post('/favorite/integrate', [FavoriteController::class, 'integrateFavorite']);

  Route::resources([
    '/favorite' => FavoriteController::class,
  ]);

  Route::resources([
    '/review' => ReviewController::class,
  ]);
});
