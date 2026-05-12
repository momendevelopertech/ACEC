<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Locale is handled by SetLocale middleware for web routes
        // and by URL parameter for API routes.
        // This early boot hook is intentionally empty to avoid
        // attempting session access before it is initialized.
    }
}
