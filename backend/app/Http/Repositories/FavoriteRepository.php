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

  public function getList($user_id)
  {
    return Favorite::where('user_id', $user_id)
      ->orderBy('created_at', 'desc')
      ->get();
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

  public function delete($params)
  {
    $data = Favorite::where('user_id', $params['user_id'])
      ->where('product_id', $params['product_id'])
      ->first();

    $data->delete();

    return $data;
  }
}
