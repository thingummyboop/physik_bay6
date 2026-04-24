from manim import *

class LinsenBrechung(Scene):
    def construct(self):
        self.camera.frame_width = 22
        self.camera.frame_height = 22 * 9 / 16
        title = Text("Brechung an einer Sammellinse").to_edge(UP)
        self.play(Write(title))

        # Optical axis
        axis = DashedLine(LEFT * 8, RIGHT * 8, color=GRAY)
        self.play(Create(axis))

        # Convex lens using arcs
        lens = VGroup(
            ArcBetweenPoints(UP * 3, DOWN * 3, radius=4),
            ArcBetweenPoints(DOWN * 3, UP * 3, radius=4)
        ).set_color(BLUE).set_fill(BLUE, opacity=0.3)
        self.play(DrawBorderThenFill(lens))

        # Focal points
        f1 = Dot(LEFT * 4, color=RED)
        f2 = Dot(RIGHT * 4, color=RED)
        f1_label = Text("F", color=RED, font_size=30).next_to(f1, DOWN, buff=0.5)
        f2_label = Text("F'", color=RED, font_size=30).next_to(f2, DOWN, buff=0.5)
        self.play(FadeIn(f1, f2, f1_label, f2_label))

        # Light rays
        rays_in = VGroup()
        rays_out = VGroup()
        
        for y in [-2, -1, 1, 2]:
            ray_in = Line(LEFT * 8 + UP * y, UP * y, color=YELLOW)
            ray_out = Line(UP * y, RIGHT * 8 + UP * (y * -1), color=YELLOW)
            ray_out.put_start_and_end_on(UP * y, RIGHT * 4 + ORIGIN if y == 0 else UP*y + (RIGHT*4 - UP*y)*2)
            rays_in.add(ray_in)
            rays_out.add(ray_out)

        # Central ray
        center_ray_in = Line(LEFT * 8, ORIGIN, color=YELLOW)
        center_ray_out = Line(ORIGIN, RIGHT * 8, color=YELLOW)
        rays_in.add(center_ray_in)
        rays_out.add(center_ray_out)

        self.play(Create(rays_in), run_time=2)
        self.play(Create(rays_out), run_time=2)
        
        focus_text = Text("Brennpunkt", color=YELLOW, font_size=28).next_to(f2, UP, buff=0.5)
        self.play(Write(focus_text))

        self.wait(2)