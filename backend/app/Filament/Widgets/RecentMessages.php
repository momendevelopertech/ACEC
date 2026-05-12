<?php

namespace App\Filament\Widgets;

use App\Models\Message;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentMessages extends TableWidget
{
    protected int|string|array $columnSpan = 'full';

    public function getHeading(): string
    {
        return __('admin.recent_messages');
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Message::query()->latest()->limit(5))
            ->stackedOnMobile()
            ->columns([
                TextColumn::make('name')->label(__('admin.col_name')),
                TextColumn::make('email')->label(__('admin.col_email')),
                TextColumn::make('subject')->label(__('admin.col_subject'))->limit(40),
                BadgeColumn::make('service_type')->label(__('admin.col_service'))->color('gray'),
                IconColumn::make('is_read')->boolean()->label(__('admin.col_read')),
                TextColumn::make('created_at')->dateTime()->label(__('admin.col_received')),
            ]);
    }
}
