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
            Stat::make('Total Projects', Project::where('is_active', true)->count())
                ->description('Active projects')
                ->color('primary')
                ->icon(Heroicon::OutlinedBuildingOffice2),
            Stat::make('Active Services', Service::where('is_active', true)->count())
                ->description('Published services')
                ->color('success')
                ->icon(Heroicon::OutlinedWrenchScrewdriver),
            Stat::make('Unread Messages', $unreadMessages)
                ->description($unreadMessages > 0 ? 'Needs attention!' : 'All clear')
                ->color($unreadMessages > 0 ? 'danger' : 'success')
                ->icon(Heroicon::OutlinedEnvelope),
            Stat::make('Views This Month', $monthViews)
                ->description('Page views')
                ->color('info')
                ->icon(Heroicon::OutlinedEye),
        ];
    }
}
