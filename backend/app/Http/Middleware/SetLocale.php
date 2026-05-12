<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->has('lang')) {
            $lang = $request->get('lang');
            if (in_array($lang, ['ar', 'en'])) {
                Session::put('locale', $lang);
                Session::save();
            }
            return redirect($request->fullUrlWithoutQuery(['lang']));
        }

        $locale = Session::get('locale', config('app.locale', 'en'));
        App::setLocale($locale);
        config(['app.locale' => $locale]);

        return $next($request);
    }
}
