module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Value)
import Json.Encode as Encode exposing (Value)
import List exposing (head)


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


fixturesPerPhase : String -> Int
fixturesPerPhase phase =
    case phase of
        "ROUND_OF_32" ->
            16

        "ROUND_OF_16" ->
            8

        "QUARTER_FINALS" ->
            4

        "SEMI_FINALS" ->
            2

        "FINAL" ->
            1

        _ ->
            8


formatWord : String -> String
formatWord str =
    case String.uncons str of
        Just ( head, tail ) ->
            String.toLower tail
                |> String.cons (Char.toUpper head)

        Nothing ->
            ""


formatConstant : String -> String
formatConstant str =
    str
        |> String.split "_"
        |> List.map formatWord
        |> String.join " "


type alias Fixture =
    { home : String
    , away : String
    , firstMatch : String
    , secondMatch : String
    }


type alias Tournament =
    { title : String
    , fixtures : List Fixture
    , startPhase : String
    }


type alias Model =
    Tournament


type FixtureField
    = FirstMatch
    | SecondMatch
    | HomeTeam
    | AwayTeam


type Msg
    = UpdateTitle String
    | UpdateStartPhase String
    | UpdateFixture Int FixtureField String
    | Create
    | Created (Result Http.Error ())


initializeFixtures : Int -> List Fixture
initializeFixtures num =
    List.map (\_ -> Fixture "" "" "" "") (List.range 1 num)


init : () -> ( Model, Cmd Msg )
init _ =
    ( { title = ""
      , startPhase = "ROUND_OF_16"
      , fixtures = initializeFixtures 16
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


encodeFixture : Fixture -> Encode.Value
encodeFixture fixture =
    Encode.object
        [ ( "home", Encode.string fixture.home )
        , ( "away", Encode.string fixture.away )
        , ( "firstMatch", Encode.string fixture.firstMatch )
        , ( "secondMatch", Encode.string fixture.secondMatch )
        ]


encodeTournamentBody : Tournament -> Http.Body
encodeTournamentBody tournament =
    Encode.object
        [ ( "title", Encode.string tournament.title )
        , ( "startPhase", Encode.string tournament.startPhase )
        , ( "fixtures", Encode.list encodeFixture tournament.fixtures )
        ]
        |> Http.jsonBody


updateFixture : FixtureField -> String -> Fixture -> Fixture
updateFixture field value fixture =
    case field of
        HomeTeam ->
            { fixture | home = value }

        AwayTeam ->
            { fixture | away = value }

        FirstMatch ->
            { fixture | firstMatch = value }

        SecondMatch ->
            { fixture | secondMatch = value }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateTitle title ->
            ( { model | title = title }, Cmd.none )

        UpdateFixture targetIdx field value ->
            ( { model
                | fixtures =
                    model.fixtures
                        |> List.indexedMap
                            (\idx item ->
                                if idx == targetIdx then
                                    updateFixture field value item

                                else
                                    item
                            )
              }
            , Cmd.none
            )

        UpdateStartPhase phase ->
            ( { model | startPhase = phase, fixtures = initializeFixtures (fixturesPerPhase phase) }, Cmd.none )

        Create ->
            let
                cmd : Cmd Msg
                cmd =
                    Http.post
                        { url = "/create-tournament"
                        , body = encodeTournamentBody model
                        , expect = Http.expectWhatever Created
                        }
            in
            ( model, cmd )

        Created (Err error) ->
            ( model, Cmd.none )

        Created (Ok tournament) ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ h2 [] [ text "Create tournament" ]
        , div []
            [ div []
                [ label [] [ text "Title" ]
                , input [ autofocus True, value model.title, onInput UpdateTitle ] []
                ]
            , div []
                [ label [] [ text "Starting phase" ]
                , select [ onInput UpdateStartPhase ]
                    [ option [ value "FINAL" ] [ text "Final" ]
                    , option [ value "SEMI_FINALS" ] [ text "Semi finals" ]
                    , option [ value "QUARTER_FINALS" ] [ text "Quarter finals" ]
                    , option [ value "ROUND_OF_16", selected True ] [ text "Round of 16" ]
                    , option [ value "ROUND_OF_32" ] [ text "Round of 32" ]
                    ]
                ]
            , div []
                ([ h3 [] [ text (formatConstant model.startPhase) ] ]
                    ++ (model.fixtures
                            |> List.indexedMap
                                (\idx fixture ->
                                    div []
                                        [ h4 [] [ text ("Fixture " ++ String.fromInt (idx + 1)) ]
                                        , div []
                                            [ label [] [ text "Team 1" ]
                                            , input [ onInput (UpdateFixture idx HomeTeam) ] []
                                            ]
                                        , div []
                                            [ label [] [ text "Team 2" ]
                                            , input [ onInput (UpdateFixture idx AwayTeam) ] []
                                            ]
                                        , div []
                                            [ label [] [ text "First match" ]
                                            , input
                                                [ onInput (UpdateFixture idx FirstMatch) ]
                                                []
                                            ]
                                        , div []
                                            [ label [] [ text "Second match" ]
                                            , input
                                                [ onInput (UpdateFixture idx SecondMatch) ]
                                                []
                                            ]
                                        ]
                                )
                       )
                )
            ]
        , button [ onClick Create ] [ text "Create" ]
        ]
