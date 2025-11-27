<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderedItem extends Model
{
  protected $fillable = [
    'order_id',
    'product_id',
    'name',
    'price',
    'quantity',
  ];

  protected $hidden = [
    'id',
  ];

  public function orders(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  public function products() :BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
