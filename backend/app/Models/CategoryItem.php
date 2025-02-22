<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CategoryItem extends Model
{
  protected $table = 'category_item';

  protected $fillable = [
    'product_id',
    'category_id'
  ];

  protected $hidden = [
    'id'
  ];

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }
}
