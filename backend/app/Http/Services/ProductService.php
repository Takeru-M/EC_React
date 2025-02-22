<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Models\Product;
use App\Http\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;

class ProductService
{
  private $productRepo;

  public function __construct(ProductRepository $productRepo)
  {
    $this->productRepo = $productRepo;
  }

  public function getList()
  {
    $products = Product::with([
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

    return $products->map(function ($product) {
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
    });
  }

  public function create($params)
  {
      return $this->productRepo->create($params);
  }

  public function getDetailProduct($id)
  {
    $product = Product::with([
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
  }

  public function update($params, $id)
  {
      return $this->productRepo->update($params, $id);
  }

  public function delete($id)
  {
      return $this->productRepo->delete($id);
  }

  public function getPagination($params)
  {
    $data = $this->productRepo->getPagination($params);
    return [
      'data' => $data,
      'total' => $data->count(),
      'per_page' => $params['page_size'],
      'current_page' => $params['page']
    ];
  }

  public function searchProducts($params)
  {
    // $data = $this->productRepo->searchProducts($params);
    // return [
    //   'data' => $data,
      // 'total' => $data->count(),
      // 'per_page' => $params['page_size'],
      // 'current_page' => $params['page']
    // ];

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
