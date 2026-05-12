<?php

namespace App\Filament\Resources\BlogPosts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BlogPostsTable
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
                TextColumn::make('category')
                    ->label(__('admin.col_category'))
                    ->searchable(),
                TextColumn::make('author.name')
                    ->label(__('admin.col_author'))
                    ->searchable(),
                IconColumn::make('is_published')
                    ->label(__('admin.col_is_published'))
                    ->boolean(),
                TextColumn::make('published_at')
                    ->label(__('admin.col_published_at'))
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('meta_title_ar')
                    ->label(__('admin.col_meta_title_ar'))
                    ->searchable(),
                TextColumn::make('meta_title_en')
                    ->label(__('admin.col_meta_title_en'))
                    ->searchable(),
                TextColumn::make('views')
                    ->label(__('admin.col_views'))
                    ->numeric()
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
