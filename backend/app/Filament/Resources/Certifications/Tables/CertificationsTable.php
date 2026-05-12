<?php

namespace App\Filament\Resources\Certifications\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CertificationsTable
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
                ImageColumn::make('image')
                    ->label(__('admin.col_image')),
                TextColumn::make('issuer_ar')
                    ->label(__('admin.col_issuer_ar'))
                    ->searchable(),
                TextColumn::make('issuer_en')
                    ->label(__('admin.col_issuer_en'))
                    ->searchable(),
                TextColumn::make('issue_date')
                    ->label(__('admin.col_issue_date'))
                    ->date()
                    ->sortable(),
                TextColumn::make('expiry_date')
                    ->label(__('admin.col_expiry_date'))
                    ->date()
                    ->sortable(),
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
