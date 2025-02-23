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

  public function getList($params)
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
}
