<?php

namespace App\Filament\Widgets;

use App\Models\Message;
use App\Models\Service;
use App\Models\Project;
use App\Models\PageView;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $unreadMessages = Message::where('is_read', false)->count();
        $monthViews = PageView::whereMonth('created_at', now()->month)->count();

        return [
            Stat::make(__('admin.total_projects'), Project::where('is_active', true)->count())
                ->description(__('admin.active_projects'))
                ->color('primary')
                ->icon(Heroicon::OutlinedBuildingOffice2),
            Stat::make(__('admin.active_services'), Service::where('is_active', true)->count())
                ->description(__('admin.published_services'))
                ->color('success')
                ->icon(Heroicon::OutlinedWrenchScrewdriver),
            Stat::make(__('admin.unread_messages'), $unreadMessages)
                ->description($unreadMessages > 0 ? __('admin.needs_attention') : __('admin.all_clear'))
                ->color($unreadMessages > 0 ? 'danger' : 'success')
                ->icon(Heroicon::OutlinedEnvelope),
            Stat::make(__('admin.views_this_month'), $monthViews)
                ->description(__('admin.page_views'))
                ->color('info')
                ->icon(Heroicon::OutlinedEye),
        ];
    }
}
