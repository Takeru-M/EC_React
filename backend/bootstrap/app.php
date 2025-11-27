<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Middleware\EncryptCookies;
use Illuminate\Foundation\Configuration\Middleware\VerifyCsrfToken;

return Application::configure(basePath: dirname(__DIR__))
  ->withRouting(
    web: __DIR__ . '/../routes/web.php',
    api: __DIR__ . '/../routes/api.php',
    commands: __DIR__ . '/../routes/console.php',
    health: '/up',
  )
  ->withMiddleware(function (Middleware $middleware) {
    $middleware->append([
      \Illuminate\Session\Middleware\StartSession::class,
      \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    ]);
    $middleware->group('api', [
      \Illuminate\Http\Middleware\HandleCors::class,
      \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
      \Illuminate\Session\Middleware\StartSession::class,
      'throttle:api',
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
      \App\Http\Middleware\CorsMiddleware::class,
      \Illuminate\View\Middleware\ShareErrorsFromSession::class,
      \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
      Spatie\Permission\PermissionServiceProvider::class,
    ]);
    $middleware->group('web', [
      \Illuminate\Cookie\Middleware\EncryptCookies::class,
      \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
      \Illuminate\View\Middleware\ShareErrorsFromSession::class,
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ]);
    $middleware->trustProxies(at: '*')
    // TODO: Separate the available page that requrie the csrf token if being able to separate by sessions, guest and user
      ->validateCsrfTokens(except: [
        'api/v1/signup',
        'api/v1/signin',
        'api/v1/user/*',
        'api/v1/guest-user',
        'api/v1/cart/*',
        'api/v1/favorite/*',
        'api/v1/product/*',
        'api/v1/category/*',
        'api/v1/review/*',
      ]);
  })
  ->withExceptions(function (Exceptions $exceptions) {
    //
  })->create();
