<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];

    protected $hidden = [
        'id',
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
      return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
