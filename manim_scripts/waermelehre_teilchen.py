from manim import *
import random

class WaermelehreTeilchen(Scene):
    def construct(self):
        self.camera.frame_width = 22
        self.camera.frame_height = 22 * 9 / 16
        title = Text("Temperatur = Teilchenbewegung").to_edge(UP)
        self.play(Write(title))

        box_cold = Rectangle(width=3, height=3, color=BLUE).shift(LEFT*3.5)
        box_hot = Rectangle(width=3, height=3, color=RED).shift(RIGHT*3.5)

        cold_text = Text("Kalt (Wenig Bewegung)", color=BLUE, font_size=24).next_to(box_cold, UP)
        hot_text = Text("Heiß (Viel Bewegung)", color=RED, font_size=24).next_to(box_hot, UP)

        self.play(Create(box_cold), Create(box_hot), Write(cold_text), Write(hot_text))

        cold_dots = VGroup(*[Dot(color=BLUE, radius=0.1).move_to(LEFT*3.5 + RIGHT*random.uniform(-1.2,1.2) + UP*random.uniform(-1.2,1.2)) for _ in range(30)])
        hot_dots = VGroup(*[Dot(color=RED, radius=0.1).move_to(RIGHT*3.5 + RIGHT*random.uniform(-1.2,1.2) + UP*random.uniform(-1.2,1.2)) for _ in range(30)])

        self.play(FadeIn(cold_dots), FadeIn(hot_dots))

        # Add updater for jittering motion
        def update_cold(mobs, dt):
            for dot in mobs:
                dot.shift((RIGHT*random.uniform(-0.5,0.5) + UP*random.uniform(-0.5,0.5)) * dt)

        def update_hot(mobs, dt):
            for dot in mobs:
                dot.shift((RIGHT*random.uniform(-8,8) + UP*random.uniform(-8,8)) * dt)

        cold_dots.add_updater(update_cold)
        hot_dots.add_updater(update_hot)

        self.wait(5)
        cold_dots.clear_updaters()
        hot_dots.clear_updaters()
        
        info = Text("Mehr Wärme = Mehr Platzbedarf (Ausdehnung)", color=YELLOW, font_size=24).move_to(DOWN*3)
        self.play(Write(info))
        self.wait(2)