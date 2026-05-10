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
                    ->required(),
                TextInput::make('name_en')
                    ->required(),
                TextInput::make('position_ar'),
                TextInput::make('position_en'),
                Textarea::make('bio_ar')
                    ->columnSpanFull(),
                Textarea::make('bio_en')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('linkedin'),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
