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
            ->sidebarCollapsibleOnDesktop()
            ->sidebarFullyCollapsibleOnDesktop()
            ->sidebarWidth('16rem')
            ->collapsedSidebarWidth('4rem')
            ->favicon(asset('images/favicon-dashboard.svg'))
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
                FilamentView::registerRenderHook(
                    PanelsRenderHook::HEAD_END,
                    fn (): string => $this->getDirectionalStyles() . $this->getFaviconHtml(),
                );
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

    private function getDirectionalStyles(): string
    {
        return <<<'CSS'
        <style>
            /* ============================
               UNIVERSAL — applies to both LTR & RTL
               ============================ */
            .fi-sidebar-item {
                text-align: start !important;
            }
            .fi-sidebar-item-icon {
                margin-inline-end: 0.75rem !important;
                margin-inline-start: 0 !important;
            }
            .fi-sidebar-group-label {
                text-align: start !important;
            }
            .fi-main-ctn {
                margin-inline: 0 !important;
            }
            .fi-header,
            .fi-header-heading,
            .fi-header-subheading {
                text-align: start !important;
            }
            .fi-table th,
            .fi-table td {
                text-align: start !important;
            }
            .fi-fo-field-wrp {
                text-align: start !important;
            }
            .fi-section-header-heading,
            .fi-section-header-description {
                text-align: start !important;
            }
            .fi-btn-icon {
                margin-inline-end: 0.5rem !important;
                margin-inline-start: 0 !important;
            }
            .fi-wi-stats-overview-stat {
                text-align: start !important;
            }
            .fi-wi-stats-overview-stat-icon {
                margin-inline-start: 0.75rem !important;
                margin-inline-end: 0 !important;
            }
            .fi-dropdown-item {
                text-align: start !important;
            }
            .fi-dropdown-list-item-icon {
                margin-inline-end: 0.75rem !important;
                margin-inline-start: 0 !important;
            }
            .fi-empty-state {
                text-align: start !important;
            }
            .fi-modal-heading,
            .fi-modal-description {
                text-align: start !important;
            }
            .fi-content {
                max-width: 100% !important;
            }

            /* ============================
               RTL — right-to-left specifics
               ============================ */
            [dir="rtl"] .fi-sidebar-nav {
                order: 2;
            }
            [dir="rtl"] .fi-sidebar {
                right: 0 !important;
                left: auto !important;
                border-right: none !important;
                border-left: 1px solid var(--gray-200, #e5e7eb) !important;
            }
            [dir="rtl"] .fi-topbar {
                right: var(--sidebar-width) !important;
                left: 0 !important;
            }
            [dir="rtl"] .fi-breadcrumbs ol {
                flex-direction: row-reverse !important;
                justify-content: flex-end !important;
            }
            [dir="rtl"] .fi-breadcrumbs li + li::before {
                margin-inline: 0.5rem !important;
                transform: rotate(180deg) !important;
            }
            [dir="rtl"] .fi-btn {
                flex-direction: row-reverse !important;
            }
            [dir="rtl"] .fi-pagination {
                flex-direction: row-reverse !important;
            }
            [dir="rtl"] .fi-icon-btn svg {
                transform: scaleX(-1);
            }
            [dir="rtl"] .fi-sidebar-header {
                flex-direction: row-reverse;
            }

            /* ============================
               LTR — left-to-right specifics
               ============================ */
            [dir="ltr"] .fi-sidebar {
                left: 0 !important;
                right: auto !important;
                border-left: none !important;
                border-right: 1px solid var(--gray-200, #e5e7eb) !important;
            }
            [dir="ltr"] .fi-topbar {
                left: var(--sidebar-width) !important;
                right: 0 !important;
            }

            /* ============================
               RESPONSIVE — mobile & tablet
               ============================ */
            @media (max-width: 1024px) {
                .fi-topbar {
                    right: 0 !important;
                    left: 0 !important;
                }

                .fi-main-ctn {
                    margin-inline: 0 !important;
                }

                [dir="rtl"] .fi-sidebar {
                    transform: translateX(100%) !important;
                }
                [dir="ltr"] .fi-sidebar {
                    transform: translateX(-100%) !important;
                }
                [dir="rtl"] .fi-sidebar.fi-sidebar-open,
                [dir="ltr"] .fi-sidebar.fi-sidebar-open {
                    transform: translateX(0) !important;
                }
            }
            /* ============================
               COLLAPSED SIDEBAR — icon-only mode
               ============================ */
            .fi-sidebar:not(.fi-sidebar-open) .fi-sidebar-item-btn {
                justify-content: center !important;
                min-height: 44px !important;
                min-width: 44px !important;
                padding: 0.5rem !important;
            }
            .fi-sidebar:not(.fi-sidebar-open) .fi-sidebar-item-icon {
                margin-inline-end: 0 !important;
                margin-inline-start: 0 !important;
            }
            .fi-sidebar:not(.fi-sidebar-open) .fi-sidebar-nav {
                padding-inline: 0.25rem !important;
            }
            .fi-sidebar:not(.fi-sidebar-open) .fi-sidebar-nav-groups {
                margin-inline: 0 !important;
            }
            .fi-sidebar:not(.fi-sidebar-open) .fi-sidebar-group-dropdown-trigger-btn {
                justify-content: center !important;
                min-height: 44px !important;
                min-width: 44px !important;
                padding: 0.5rem !important;
                display: flex !important;
                align-items: center !important;
            }

            /* ============================
               TOPBAR — responsive to sidebar state
               ============================ */
            .fi-topbar {
                transition-property: left, right !important;
                transition-duration: 200ms !important;
            }
         </style>
        CSS;
    }

    private function getFaviconHtml(): string
    {
        $imgUrl = asset('images');

        return implode("\n", [
            '<link rel="icon" type="image/png" sizes="16x16" href="' . $imgUrl . '/favicon-dashboard-16x16.png">',
            '<link rel="icon" type="image/png" sizes="32x32" href="' . $imgUrl . '/favicon-dashboard-32x32.png">',
            '<link rel="icon" type="image/png" sizes="48x48" href="' . $imgUrl . '/favicon-dashboard-48x48.png">',
            '<link rel="icon" type="image/png" sizes="192x192" href="' . $imgUrl . '/favicon-dashboard-192x192.png">',
            '<link rel="icon" type="image/png" sizes="512x512" href="' . $imgUrl . '/favicon-dashboard-512x512.png">',
            '<link rel="apple-touch-icon" sizes="180x180" href="' . $imgUrl . '/apple-touch-icon-dashboard.png">',
            '<link rel="icon" type="image/png" href="' . $imgUrl . '/favicon-dashboard-dark-32x32.png" media="(prefers-color-scheme: dark)">',
        ]);
    }
}
