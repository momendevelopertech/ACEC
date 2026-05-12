<?php

namespace App\Filament\Resources\Contacts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ContactsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label(__('admin.col_name'))->searchable()->sortable(),
                TextColumn::make('email')->label(__('admin.col_email'))->searchable(),
                TextColumn::make('subject')->label(__('admin.col_subject'))->limit(30),
                BadgeColumn::make('service_type')->label(__('admin.col_service'))->color('gray'),
                TextColumn::make('lang')->label(__('admin.col_lang'))->badge()->color(fn ($state) => $state === 'ar' ? 'warning' : 'info'),
                IconColumn::make('is_read')->label(__('admin.col_read'))->boolean(),
                IconColumn::make('is_replied')->label(__('admin.col_replied'))->boolean(),
                TextColumn::make('created_at')->label(__('admin.col_received'))->dateTime()->sortable(),
            ])
            ->stackedOnMobile()
            ->defaultSort('created_at', 'desc')
            ->filters([
                TernaryFilter::make('is_read'),
                TernaryFilter::make('is_replied'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
