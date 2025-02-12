<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
  protected $fillable = [
    'name',
    'description',
    'price',
    'stock',
    'image',
    'rating',
    'created_by',
    'exist'
  ];

  protected $hidden = [
    'created_by',
    'updated_by',
    'deleted_by',
    'deleted_at'
  ];

  public function category_item(): HasMany
  {
    return $this->hasMany(CategoryItem::class);
  }

  public function category(): HasMany
  {
    return $this->hasMany(Category::class);
  }

  public function ordereditems(): HasMany
  {
    return $this->hasMany(OrderdItem::class);
  }

  public function reviews(): HasMany
  {
    return $this->hasMany(Review::class);
  }

  public function favorites(): HasMany
  {
    return $this->hasMany(Favorite::class);
  }
}
