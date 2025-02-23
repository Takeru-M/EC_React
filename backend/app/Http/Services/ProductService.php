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

  public function getList($params)
  {
    $response = $this->productRepo->getList($params);
    $products = $response['data'];

    $data['data'] = $products->map(function ($product) {
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

    $data['total'] = $response['total'];
    $data['per_page'] = $response['per_page'];
    $data['current_page'] = $response['current_page'];

    return $data;
  }

  public function create($params)
  {
      return $this->productRepo->create($params);
  }

  public function getDetailProduct($id)
  {
    $data = $this->productRepo->getDetailProduct($id);

    return [
      'id' => $data->id,
      'name' => $data->name,
      'description' => $data->description,
      'price' => $data->price,
      'stock' => $data->stock,
      'image' => $data->image,
      'rating' => [
        'rate' => (float) $data->rate,
        'count' => (int) $data->review_count
      ],
      'categories' => $data->category_item->map(function ($item) {
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

  public function searchProducts($params)
  {
    $response = $this->productRepo->searchProducts($params);
    $products = $response['data'];

    // フォーマットを整形して返す
    $data['data'] = $products->map(function ($product) {
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

    $data['total'] = $response['total'];
    $data['per_page'] = $response['per_page'];
    $data['current_page'] = $response['current_page'];

    return $data;
  }
}
