<?php

namespace App\Filament\Resources\Themes\Tables;

use App\Models\Theme;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ThemesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('admin.col_name'))
                    ->searchable(),
                TextColumn::make('name_ar')
                    ->label(__('admin.col_name_ar'))
                    ->searchable(),
                TextColumn::make('slug')
                    ->label(__('admin.col_slug'))
                    ->searchable(),
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
                Action::make('activate')
                    ->label(__('admin.btn_activate'))
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(function (Theme $record) {
                        Theme::query()->update(['is_active' => false]);
                        $record->update(['is_active' => true]);
                        Notification::make()->title(__('admin.notification_theme_activated'))->success()->send();
                    }),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
