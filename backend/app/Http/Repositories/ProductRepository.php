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

  public function getList($params)
  {
      $page = (int) $params['page'];
      $pageSize = (int) $params['page_size'];

      $query = Product::with([
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
        ->orderBy('created_at', 'desc');

        $total = $query->count();
        // $totalPages = ceil($total / $pageSize);
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
      return Product::create($params);
  }

  public function getDetailProduct($id)
  {
      return Product::with([
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
        ->where('id', $id)
        ->first();
  }

  public function update($params, $id)
  {
      $data = Product::where('id', $id)->first();
      $data->update($params);
      return $data->refresh();
  }

  public function delete($id)
  {
    $data = Product::where('id', $id)->first();
    $data->delete();
    return $data;
  }

  public function searchProducts($params)
  {
      $page = (int) $params['page'];
      $pageSize = (int) $params['page_size'];

      $query = Product::query();

      // 検索ワードがある場合、name または description に含まれるかをチェック
      if (!empty($params['searchTerm'])) {
          $query->where(function ($q) use ($params) {
              $q->where('name', 'like', '%' . $params['searchTerm'] . '%')
                ->orWhere('description', 'like', '%' . $params['searchTerm'] . '%');
          });
      }

      // カテゴリーIDで商品を絞り込み
      if (!empty($params['category_id'])) {
          $query->whereIn('id', function ($subQuery) use ($params) {
              $subQuery->select('product_id')
                  ->from('category_item')
                  ->where('category_id', $params['category_id']);
          });
      }

      $query->with([
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
      ->orderBy('created_at', 'desc');

      $total = $query->count();
      $data = $query->skip(($page - 1) * $pageSize)->take($pageSize)->get();

      return [
          'data' => $data,
          'total' => $total,
          'per_page' => $pageSize,
          'current_page' => $page,
      ];
  }
}
