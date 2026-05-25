<?php

namespace App\Filament\Resources\HeroSections\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HeroSectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('lang')
                    ->label(__('admin.col_lang'))
                    ->badge()
                    ->color(fn (string $state): string => $state === 'ar' ? 'success' : 'info')
                    ->formatStateUsing(fn (string $state): string => $state === 'ar' ? 'العربية' : 'English'),

                TextColumn::make('title')
                    ->label(__('admin.col_hero_title'))
                    ->searchable()
                    ->limit(40),

                ImageColumn::make('image')
                    ->label(__('admin.col_image')),

                TextColumn::make('stat1_number')
                    ->label(__('admin.col_stat_number') . ' 1'),

                TextColumn::make('created_at')
                    ->label(__('admin.col_created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label(__('admin.col_updated_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->stackedOnMobile()
            ->filters([
                //
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
