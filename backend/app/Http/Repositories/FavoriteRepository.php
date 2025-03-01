<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Favorite;

class FavoriteRepository
{
  public function getAllFavorites()
  {
    return Favorite::all();
  }

  public function fetchFavorites($params)
  {
    $page = (int) $params['page'];
    $pageSize = (int) $params['page_size'];

    $query = Favorite::query();

    $query->where('user_id', $params['user_id'])
      ->with('product');

    $total = $query->count();
    $data = $query->skip(($page - 1) * $pageSize)->take($pageSize)->get();

    return [
      'data' => $data,
      'total' => $total,
      'per_page' => $pageSize,
      'current_page' => $page,
    ];
  }

  public function create($params)
  {
    return Favorite::create($params);
  }

  // public function getDetailFavorite($user_id)
  // {
  //   return Favorite::where('user_id', $user_id)
  //     ->where('exist', true)
  //     ->first();
  // }fav

  public function delete($favorite_id)
  {
    $data = Favorite::where('id', $favorite_id)->first();
    $data->delete();

    return $data;
  }

  public function fetchFavoritesForGuest($params)
  {
    $page = (int) $params['page'];
    $pageSize = (int) $params['page_size'];

    $query = Favorite::query();

    $query->where('guest_id', $params['guest_id'])
      ->with('product');

    $total = $query->count();
    $data = $query->skip(($page - 1) * $pageSize)->take($pageSize)->get();

    return [
      'data' => $data,
      'total' => $total,
      'per_page' => $pageSize,
      'current_page' => $page,
    ];
  }

  public function createForGuest($params)
  {
    return Favorite::create($params);
  }

  public function integrateFavorite($params)
  {
    // First, get all guest favorites
    $guestFavorites = Favorite::where('guest_id', $params['guest_id'])->get();

    foreach ($guestFavorites as $guestFavorite) {
      // Check if user already has this product in favorite
      $existingFavorite = Favorite::where('user_id', $params['user_id'])
        ->where('product_id', $guestFavorite->product_id)
        ->first();

      if ($existingFavorite) {
        // Update quantity if product already exists
        $existingFavorite->update([
          'quantity' => $existingFavorite->quantity + $guestFavorite->quantity
        ]);
        // Delete guest favorite
        $guestFavorite->delete();
      } else {
        // Just update the favorite ownership
        $guestFavorite->update([
          'user_id' => $params['user_id'],
          'guest_id' => null
        ]);
      }
    }

    return true;
  }
}
