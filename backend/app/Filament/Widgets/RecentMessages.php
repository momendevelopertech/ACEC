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
    protected static ?string $heading = 'Recent Messages';
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Message::query()->latest()->limit(5))
            ->columns([
                TextColumn::make('name')->label('Name'),
                TextColumn::make('email')->label('Email'),
                TextColumn::make('subject')->label('Subject')->limit(40),
                BadgeColumn::make('service_type')->label('Service')->color('gray'),
                IconColumn::make('is_read')->boolean()->label('Read'),
                TextColumn::make('created_at')->dateTime()->label('Received'),
            ]);
    }
}
