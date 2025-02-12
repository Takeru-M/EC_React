<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Product;

class ProductRepository
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
      return Product::where('id', $id)
          ->where('exist', true)
          ->first();
  }

  public function update($params, $id)
  {
      $data = Product::where('id', $id)->first();
      $data->update($params);
      return $data;
  }

  public function delete($id)
  {
    $data = Product::where('id', $id)->first();
    $data->delete();
    return $data;
  }
}
