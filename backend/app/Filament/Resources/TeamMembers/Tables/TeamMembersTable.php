<?php

namespace App\Filament\Resources\TeamMembers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class TeamMembersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name_ar')
                    ->label(__('admin.col_name_ar'))
                    ->searchable(),
                TextColumn::make('name_en')
                    ->label(__('admin.col_name_en'))
                    ->searchable(),
                TextColumn::make('position_ar')
                    ->label(__('admin.col_position_ar'))
                    ->searchable(),
                TextColumn::make('position_en')
                    ->label(__('admin.col_position_en'))
                    ->searchable(),
                ImageColumn::make('image')
                    ->label(__('admin.col_image')),
                TextColumn::make('email')
                    ->label(__('admin.col_email'))
                    ->searchable(),
                TextColumn::make('linkedin')
                    ->label(__('admin.col_linkedin'))
                    ->searchable(),
                TextColumn::make('order')
                    ->label(__('admin.col_order'))
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->boolean(),
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
