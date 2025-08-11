import { data } from "@/data"
import { TrackType } from "@/sherdTypes/sheredTypes"
import ReduxProvider from "@/store/ReduxProvider";
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import PlaylistItem from "./PlaylistItem";
import { formatTime } from "@/utils/helpers";

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('trackComponent', () => {
    it("отрисовка данных трека", ()=>{
        render(<ReduxProvider><PlaylistItem tracks={mockTracks}/></ReduxProvider>)
        expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0)
        expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0)
        expect(screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length).toBeGreaterThan(0)

    })
    
})