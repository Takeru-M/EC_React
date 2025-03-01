<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'guest_id',
        'product_id',
        'quantity',
    ];

    public function users(): BelongsTo
    {
      return $this->belongsTo(User::class);
    }

    public function guestUsers(): BelongsTo
    {
      return $this->belongsTo(GuestUser::class);
    }

    public function product(): BelongsTo
    {
      return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
