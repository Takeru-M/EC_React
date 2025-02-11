<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Product;

class ReviewRepository
{
  public function getAllProducts()
  {
    return Product::all();
  }

  public function getList()
  {
    return Product::with('category')
      ->where('exist', true)
      ->orderBy('created_at', 'desc')
      ->paginate(10);
  }

  public function create($params)
  {
    return Product::create($params);
  }

  public function getDetailProduct($id)
  {
    return Product::where('id', $id)->first();
  }

  public function update($params, $id)
  {
    return Product::where('id', $id)->update($params);
  }

  public function delete($id)
  {
    return Product::where('id', $id)->delete();
  }
}
