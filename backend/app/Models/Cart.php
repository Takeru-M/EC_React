<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $fillable = [
        'count'
    ];

    protected $hidden = [
        'id',
        'user_id',
        'product_id',
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }

    public function category_item(): HasMany
    {
      return $this->hasMany(CategoryItem::class);
    }
}
