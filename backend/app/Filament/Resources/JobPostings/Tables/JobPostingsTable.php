<?php

namespace App\Filament\Resources\JobPostings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class JobPostingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title_ar')
                    ->label(__('admin.col_title_ar'))
                    ->searchable(),
                TextColumn::make('title_en')
                    ->label(__('admin.col_title_en'))
                    ->searchable(),
                TextColumn::make('location_ar')
                    ->label(__('admin.col_location_ar'))
                    ->searchable(),
                TextColumn::make('location_en')
                    ->label(__('admin.col_location_en'))
                    ->searchable(),
                TextColumn::make('type')
                    ->label(__('admin.col_type'))
                    ->searchable(),
                TextColumn::make('salary_range')
                    ->label(__('admin.col_salary_range'))
                    ->searchable(),
                IconColumn::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->boolean(),
                TextColumn::make('expires_at')
                    ->label(__('admin.col_expires_at'))
                    ->dateTime()
                    ->sortable(),
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
