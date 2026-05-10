<?php

namespace App\Filament\Resources\Certifications\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CertificationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name_ar')
                    ->required(),
                TextInput::make('name_en')
                    ->required(),
                Textarea::make('description_ar')
                    ->columnSpanFull(),
                Textarea::make('description_en')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('issuer_ar'),
                TextInput::make('issuer_en'),
                DatePicker::make('issue_date'),
                DatePicker::make('expiry_date'),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
