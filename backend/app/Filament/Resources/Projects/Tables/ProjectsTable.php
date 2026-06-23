<?php

namespace App\Filament\Resources\Projects\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('slug')
                    ->label(__('admin.col_slug'))
                    ->searchable(),
                TextColumn::make('title_ar')
                    ->label(__('admin.col_title_ar'))
                    ->searchable(),
                TextColumn::make('title_en')
                    ->label(__('admin.col_title_en'))
                    ->searchable(),
                ImageColumn::make('image')
                    ->label(__('admin.col_image')),
                TextColumn::make('category_ar')
                    ->label(__('admin.col_category_ar'))
                    ->searchable(),
                TextColumn::make('category_en')
                    ->label(__('admin.col_category_en'))
                    ->searchable(),
                TextColumn::make('location_ar')
                    ->label(__('admin.col_location_ar'))
                    ->searchable(),
                TextColumn::make('location_en')
                    ->label(__('admin.col_location_en'))
                    ->searchable(),
                TextColumn::make('client_ar')
                    ->label(__('admin.col_client_ar'))
                    ->searchable(),
                TextColumn::make('client_en')
                    ->label(__('admin.col_client_en'))
                    ->searchable(),
                TextColumn::make('year')
                    ->label(__('admin.col_year'))
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_featured')
                    ->label(__('admin.col_is_featured'))
                    ->boolean(),
                TextColumn::make('order')
                    ->label(__('admin.col_order'))
                    ->numeric()
                    ->sortable(),
                ToggleColumn::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->onColor('success')
                    ->offColor('gray'),
                TextColumn::make('meta_title_ar')
                    ->label(__('admin.col_meta_title_ar'))
                    ->searchable(),
                TextColumn::make('meta_title_en')
                    ->label(__('admin.col_meta_title_en'))
                    ->searchable(),
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
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
