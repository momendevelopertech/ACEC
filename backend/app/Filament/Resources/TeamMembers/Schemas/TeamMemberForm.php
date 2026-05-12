<?php

namespace App\Filament\Resources\TeamMembers\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TeamMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name_ar')
                    ->label(__('admin.col_name_ar'))
                    ->required(),
                TextInput::make('name_en')
                    ->label(__('admin.col_name_en'))
                    ->required(),
                TextInput::make('position_ar')
                    ->label(__('admin.col_position_ar')),
                TextInput::make('position_en')
                    ->label(__('admin.col_position_en')),
                Textarea::make('bio_ar')
                    ->label(__('admin.col_bio_ar'))
                    ->columnSpanFull(),
                Textarea::make('bio_en')
                    ->label(__('admin.col_bio_en'))
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label(__('admin.col_image'))
                    ->image()
                    ->disk('public')
                    ->directory('models/team-members')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                TextInput::make('email')
                    ->label(__('admin.col_email'))
                    ->email()
                    ->extraAttributes(['dir' => 'ltr']),
                TextInput::make('linkedin')
                    ->label(__('admin.col_linkedin')),
                TextInput::make('order')
                    ->label(__('admin.col_order'))
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->required(),
            ]);
    }
}
