<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\MenuItem;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Enums\Width;
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandLogo(asset('images/logo.svg'))
            ->brandName('ACEC')
            ->maxContentWidth(Width::Full)
            ->sidebarFullyCollapsibleOnDesktop()
            ->colors([
                'primary' => Color::Amber,
                'danger' => Color::Rose,
                'gray' => Color::Gray,
                'info' => Color::Sky,
                'success' => Color::Emerald,
                'warning' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                \App\Filament\Widgets\StatsOverview::class,
                \App\Filament\Widgets\RecentMessages::class,
                AccountWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                \App\Http\Middleware\SetLocale::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->bootUsing(function (Panel $panel): void {
                if (app()->getLocale() === 'ar') {
                    FilamentView::registerRenderHook(
                        PanelsRenderHook::HEAD_END,
                        fn (): string => $this->getRtlStyles(),
                    );
                }
            })
            ->userMenuItems([
                MenuItem::make()
                    ->label(function (): string {
                        $locale = app()->getLocale();
                        return $locale === 'ar' ? __('admin.lang_switch_en') : __('admin.lang_switch_ar');
                    })
                    ->icon('heroicon-o-language')
                    ->url(function (): string {
                        $locale = app()->getLocale();
                        $target = $locale === 'ar' ? 'en' : 'ar';
                        $current = url()->current();
                        $sep = str_contains($current, '?') ? '&' : '?';
                        return $current . $sep . 'lang=' . $target;
                    }),
                'logout' => MenuItem::make()
                    ->label(fn(): string => __('admin.logout')),
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }

    private function getRtlStyles(): string
    {
        return <<<'CSS'
        <style>
            [dir="rtl"] .fi-sidebar-nav {
                order: 2;
            }

            [dir="rtl"] .fi-sidebar {
                right: 0 !important;
                left: auto !important;
                border-right: none !important;
                border-left: 1px solid var(--gray-200, #e5e7eb) !important;
            }

            [dir="rtl"] .fi-sidebar-item {
                text-align: right !important;
            }

            [dir="rtl"] .fi-sidebar-item-icon {
                margin-right: 0 !important;
                margin-left: 0.75rem !important;
            }

            [dir="rtl"] .fi-sidebar-group-label {
                text-align: right !important;
            }

            [dir="rtl"] .fi-topbar {
                right: 16rem !important;
                left: 0 !important;
            }

            [dir="rtl"] .fi-main-ctn {
                margin-right: 16rem !important;
                margin-left: 0 !important;
            }

            [dir="rtl"] .fi-header {
                text-align: right !important;
            }

            [dir="rtl"] .fi-header-heading {
                text-align: right !important;
            }

            [dir="rtl"] .fi-header-subheading {
                text-align: right !important;
            }

            [dir="rtl"] .fi-breadcrumbs ol {
                flex-direction: row-reverse !important;
                justify-content: flex-end !important;
            }

            [dir="rtl"] .fi-breadcrumbs li + li::before {
                margin-left: 0.5rem !important;
                margin-right: 0.5rem !important;
                transform: rotate(180deg) !important;
            }

            [dir="rtl"] .fi-table {
                direction: rtl !important;
            }

            [dir="rtl"] .fi-table th {
                text-align: right !important;
            }

            [dir="rtl"] .fi-table td {
                text-align: right !important;
            }

            [dir="rtl"] .fi-fo-field-wrp {
                text-align: right !important;
            }

            [dir="rtl"] .fi-section-header-heading {
                text-align: right !important;
            }

            [dir="rtl"] .fi-section-header-description {
                text-align: right !important;
            }

            [dir="rtl"] .fi-btn {
                flex-direction: row-reverse !important;
            }

            [dir="rtl"] .fi-btn-icon {
                margin-left: 0.5rem !important;
                margin-right: 0 !important;
            }

            [dir="rtl"] .fi-wi-stats-overview-stat {
                text-align: right !important;
            }

            [dir="rtl"] .fi-wi-stats-overview-stat-icon {
                margin-left: 0 !important;
                margin-right: 0.75rem !important;
            }

            [dir="rtl"] .fi-pagination {
                flex-direction: row-reverse !important;
            }

            [dir="rtl"] .fi-dropdown-item {
                text-align: right !important;
            }

            [dir="rtl"] .fi-dropdown-list-item-icon {
                margin-right: 0 !important;
                margin-left: 0.75rem !important;
            }

            [dir="rtl"] .fi-empty-state {
                text-align: right !important;
            }

            [dir="rtl"] .fi-modal-heading {
                text-align: right !important;
            }

            [dir="rtl"] .fi-modal-description {
                text-align: right !important;
            }

            [dir="rtl"] .fi-icon-btn svg {
                transform: scaleX(-1);
            }

            [dir="rtl"] .fi-sidebar-header {
                flex-direction: row-reverse;
            }

            @media (max-width: 1024px) {
                [dir="rtl"] .fi-topbar {
                    right: 0 !important;
                }

                [dir="rtl"] .fi-main-ctn {
                    margin-right: 0 !important;
                }

                [dir="rtl"] .fi-sidebar {
                    transform: translateX(100%) !important;
                }

                [dir="rtl"] .fi-sidebar.fi-open {
                    transform: translateX(0) !important;
                }
            }

            .fi-content {
                max-width: 100% !important;
            }
        </style>
        CSS;
    }
}
