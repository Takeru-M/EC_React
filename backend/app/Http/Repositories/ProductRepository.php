<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Product;
use App\Constants\Constant;
use Illuminate\Support\Facades\DB;

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
          ->take(Constant::DEFAULT_PAGE_SIZE)
          ->get();
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

  public function getPagination($params)
  {
    // tmp
    return Product::where('exist', true)
        ->orderBy('created_at', 'desc')
        ->take($params['per_page'])
        ->skip($params['current_page'])
        ->get();
  }

  public function searchProducts($params)
  {
    // category_itemから条件合致するもののproduct_idを取得
    // product_idをもとにproductを取得

    // TODO: SQLTuning
    // $query = Product::query();

    // if (!empty($params->searchTerm)) {
    //   $query->where(function ($q) use ($params) {
    //       $q->where('name', 'LIKE', '%' . $params->searchTerm . '%')
    //         ->orWhere('description', 'LIKE', '%' . $params->searchTerm . '%');
    //   });
    // }

    // if (!empty($params->category_id)) {
    //   $query->whereHas('categories', function ($q) use ($params) {
    //       $q->where('categories.id', $params->category_id);
    //   });
    // }

    $query = Product::query();

    // 検索ワードがある場合、name または description に含まれるかをチェック
    if ($params->has('keyword') && !empty($params->keyword)) {
        $query->where(function ($q) use ($params) {
            $q->where('name', 'like', '%' . $params->keyword . '%')
              ->orWhere('description', 'like', '%' . $params->keyword . '%');
        });
    }

    // カテゴリーIDで商品を絞り込み
    if ($params->has('category_id') && !empty($params->category_id)) {
        $query->whereIn('id', function ($subQuery) use ($params) {
            $subQuery->select('product_id')
                ->from('category_item')
                ->where('category_id', $params->category_id);
        });
    }

    // 商品情報の取得
    $products = $query->with([
        'category_item' => function ($query) {
            $query->select('id', 'product_id', 'category_id');
        },
        'category_item.category' => function ($query) {
            $query->select('id', 'name');
        }
    ])
    ->select([
        'products.id',
        'products.name',
        'products.description',
        'products.price',
        'products.stock',
        'products.image',
        DB::raw('(SELECT COALESCE(AVG(reviews.rating), 0) FROM reviews WHERE reviews.product_id = products.id) as rate'),
        DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products.id) as review_count')
    ])
    ->where('exist', true)
    ->orderBy('created_at', 'desc')
    ->get();

    // フォーマットを整形して返す
    return response()->json($products->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
            'image' => $product->image,
            'rating' => [
                'rate' => (float) $product->rate,
                'count' => (int) $product->review_count
            ],
            'categories' => $product->category_item->map(function ($item) {
                return [
                    'id' => $item->category->id,
                    'name' => $item->category->name
                ];
            })
        ];
    }));
  }
}
