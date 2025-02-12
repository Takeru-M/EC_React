<?php

namespace App\Helpers;

class ErrorMessages
{
    public static function required($attribute)
    {
        return "{$attribute} は必須です。";
    }

    public static function email($attribute)
    {
        return "{$attribute} は有効なメールアドレスを入力してください。";
    }

    public static function min($attribute, $min)
    {
        return "{$attribute} は {$min} 文字以上で入力してください。";
    }

    public static function notFound($attribute)
    {
        return "{$attribute} が見つかりません。";
    }
  }
