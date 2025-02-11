<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    protected $fillable = [
      'name'
    ];

    protected $hidden = [
      'id'
    ];

    public function products(): BelongsTo
    {
      return $this->belongsTo(Product::class);
    }
}
