from manim import *

class LinsenBrechung(Scene):
    def construct(self):
        self.camera.frame_width = 22
        title = Text("Brechung an einer Sammellinse").to_edge(UP)
        self.play(Write(title))

        # Optical axis
        axis = DashedLine(LEFT * 6, RIGHT * 6, color=GRAY)
        self.play(Create(axis))

        # Convex lens using arcs
        lens = VGroup(
            ArcBetweenPoints(UP * 2, DOWN * 2, radius=3),
            ArcBetweenPoints(DOWN * 2, UP * 2, radius=3)
        ).set_color(BLUE).set_fill(BLUE, opacity=0.3)
        self.play(DrawBorderThenFill(lens))

        # Focal points
        f1 = Dot(LEFT * 3, color=RED)
        f2 = Dot(RIGHT * 3, color=RED)
        f1_label = Text("F", color=RED, font_size=24).next_to(f1, DOWN)
        f2_label = Text("F'", color=RED, font_size=24).next_to(f2, DOWN)
        self.play(FadeIn(f1, f2, f1_label, f2_label))

        # Light rays
        rays_in = VGroup()
        rays_out = VGroup()
        
        for y in [-1.5, -0.75, 0.75, 1.5]:
            # Parallel rays entering
            ray_in = Line(LEFT * 6 + UP * y, UP * y, color=YELLOW)
            # Rays converging at focal point
            ray_out = Line(UP * y, RIGHT * 6 + UP * (y * -1), color=YELLOW)
            
            # The intersection point at focal
            ray_out.put_start_and_end_on(UP * y, RIGHT * 3 + ORIGIN if y == 0 else UP*y + (RIGHT*3 - UP*y)*2)
            
            rays_in.add(ray_in)
            rays_out.add(ray_out)

        # Central ray
        center_ray_in = Line(LEFT * 6, ORIGIN, color=YELLOW)
        center_ray_out = Line(ORIGIN, RIGHT * 6, color=YELLOW)
        rays_in.add(center_ray_in)
        rays_out.add(center_ray_out)

        self.play(Create(rays_in), run_time=2)
        self.play(Create(rays_out), run_time=2)
        
        focus_text = Text("Brennpunkt", color=YELLOW, font_size=20).next_to(f2, UP)
        self.play(Write(focus_text))

        self.wait(2)
